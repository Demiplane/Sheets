import { CreateSheetAction } from '../sheetActions/createSheet';
import { DeleteSheetAction } from '../sheetActions/deleteSheet';
import { UpdateSheetAction } from '../sheetActions/updateSheet';
import { LoadSheetsAction } from '../sheetActions/loadSheets';
import { ActivateConditionAction } from '../sheetActions/activateCondition';
import { InactivateConditionAction } from '../sheetActions/inactivateCondition';
import { DeleteStatisticAction } from '../sheetActions/deleteStatistic';
import { AddStatisticAction } from '../sheetActions/addStatistic';
import { UpdateStatisticAction } from '../sheetActions/updateStatistic';
import { RenameSheetAction } from '../sheetActions/renameSheet';
import { UpdateItemAction } from '../sheetActions/updateItem';
import { AddItemAction } from '../sheetActions/addItem';
import { DeleteItemAction } from '../sheetActions/deleteItem';

type RootAction =
  CreateSheetAction |
  DeleteSheetAction |
  UpdateSheetAction |
  LoadSheetsAction |
  RenameSheetAction |

  ActivateConditionAction |
  InactivateConditionAction |

  UpdateItemAction |
  AddItemAction |
  DeleteItemAction |

  DeleteStatisticAction |
  UpdateStatisticAction |
  AddStatisticAction;

export default RootAction;