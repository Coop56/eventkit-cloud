import {combineReducers} from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'
import userReducer from './userReducer'
import { routerReducer } from 'react-router-redux'
import {exportJobsReducer, exportModeReducer, exportBboxReducer, exportAoiInfoReducer, exportInfoReducer, getProvidersReducer, drawerMenuReducer, stepperReducer, startExportPackageReducer} from './exportsReducer';
import {invalidDrawWarningReducer} from './drawToolBarReducer';
import {zoomToSelectionReducer, resetMapReducer} from './AoiInfobarReducer.js';
import {getGeonamesReducer} from './searchToolbarReducer.js';
import {DataPackListReducer} from './DataPackListReducer';
import {toolbarIconsReducer, showImportModalReducer, importGeomReducer} from './mapToolReducer';


const rootReducer = combineReducers({
    // short hand property names
    mode: exportModeReducer,
    bbox: exportBboxReducer,
    aoiInfo: exportAoiInfoReducer,
    exportInfo: exportInfoReducer,
    zoomToSelection: zoomToSelectionReducer,
    resetMap: resetMapReducer,
    geonames: getGeonamesReducer,
    showInvalidDrawWarning: invalidDrawWarningReducer,
    toolbarIcons: toolbarIconsReducer,
    showImportModal: showImportModalReducer,
    importGeom: importGeomReducer,
    form: reduxFormReducer,
    user: userReducer,
    routing: routerReducer,
    drawerOpen: drawerMenuReducer,
    runsList: DataPackListReducer,
    providers: getProvidersReducer,
    stepperNextEnabled: stepperReducer,
    setExportPackageFlag: startExportPackageReducer
});

export default rootReducer;