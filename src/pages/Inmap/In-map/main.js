import {
    DotOverlay
} from './overlay/DotOverlay';

import {
    GriddingOverlay
} from './overlay/GriddingOverlay';
import {
    BoundaryOverlay
} from './overlay/BoundaryOverlay';

import {
    HeatOverlay
} from './overlay/HeatOverlay';
import {
    CircuitOverlay
} from './overlay/CircuitOverlay';

import {
    HoneycombOverlay
} from './overlay/HoneycombOverlay';
import {
    ImgOverlay
} from './overlay/ImgOverlay';
import {
    Map
} from './map/index';
import * as utils from './common/util';
import Worker from './worker/index';
import {
    workerMrg
} from './common/workerMrg';

const InMap = {
    utils,
    Map,
    DotOverlay,
    GriddingOverlay,
    BoundaryOverlay,
    HeatOverlay,
    CircuitOverlay,
    HoneycombOverlay,
    workerMrg,
    ImgOverlay,
    Worker
};
export {
    utils,
    Map,
    DotOverlay,
    GriddingOverlay,
    BoundaryOverlay,
    HeatOverlay,
    CircuitOverlay,
    HoneycombOverlay,
    workerMrg,
    ImgOverlay,
    Worker
};
export default InMap;