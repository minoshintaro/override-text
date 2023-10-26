import * as jsYaml from 'js-yaml';
import { InputData } from './type';
import { convertHtmlTag } from "./convert";
import { editNameWithoutSuffix } from './edit';
import { findInstances } from "./find";

const selectedInstance: SceneNode[] = findInstances(figma.currentPage.selection);
if (!selectedInstance.length) figma.closePlugin('No selection including instances');

figma.showUI(__html__);

figma.ui.onmessage = (message) => {
  let closingMessage = "";

  switch (message.type) {
  case 'submit': {
    const inputData = jsYaml.load(message.data) as InputData;
    const limitNumber = inputData.length;
    let processCount = 0;

    for (const instance of selectedInstance) {
      if (message.mode === 'once' && processCount >= limitNumber) break;
      if (instance.type !== 'INSTANCE') continue;

      const dataUnit = inputData[processCount];
      const { componentProperties: props } = instance;

      for (const propNameAndID in props) {
        const propName = editNameWithoutSuffix(propNameAndID);
        for (const key in dataUnit) {
          if (key.toLowerCase() === propName) {
            instance.setProperties({ [propNameAndID]: convertHtmlTag(dataUnit[key]) });
          }
        }
      }

      processCount++;
      if (message.mode === 'repeat' && processCount >= limitNumber) processCount = 0;
    }

    closingMessage = 'Override Done';
    break;
  }
  case 'cancel': break;
  default: break;
  }

  figma.closePlugin(closingMessage);
};
