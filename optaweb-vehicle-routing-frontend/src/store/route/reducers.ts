/*
 * Copyright 2018 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ActionType, RouteAction, RoutingPlan } from './types';
import { GanttData } from 'store/timeline/types';
import generateTimelineData from 'ui/components/timelineData/generateTimelineData';
import { StoreAltIcon } from '@patternfly/react-icons';
import moment from "moment";

export type RoutingPlanAndGanttData = RoutingPlan & GanttData;

export const initialRouteState: RoutingPlan = {
  distance: 'no data',
  vehicles: [],
  depot: null,
  visits: [],
  routes: [],
};

export const initialTimelineState: GanttData = {
  groups: [],
  items: [],
  defaultTimeStart: moment()
      .startOf("day")
      .toDate(),
  defaultTimeEnd: moment()
      .startOf("day")
      .add(1, "day")
      .toDate(),
};
export const initialRoueteAndTimelineState: RoutingPlanAndGanttData = Object.assign(initialRouteState,initialTimelineState);

const routeReducer = (state = initialRoueteAndTimelineState, action: RouteAction): RoutingPlanAndGanttData => {
  switch (action.type) {
    case ActionType.UPDATE_ROUTING_PLAN: {
      console.log("RouteReducer generateTimelineData(action.planAndGanttData.routes);");
      console.log("RouteReducer action.planAndGanttData.routes");
      console.log(action.planAndGanttData.routes);
      
      const groups_new = generateTimelineData(action.planAndGanttData.routes).groups;
      const items_new = generateTimelineData(action.planAndGanttData.routes).items;
      console.log("RouteReducer groups_new");
      console.log(groups_new);
      console.log("RouteReducer items_new");
      console.log(items_new);
      const newState: RoutingPlanAndGanttData = {
         distance: action.planAndGanttData.distance, 
          vehicles: action.planAndGanttData.vehicles, 
          depot: action.planAndGanttData.depot, 
          visits: action.planAndGanttData.visits, 
          routes: action.planAndGanttData.routes, 
          groups: groups_new, 
          items: items_new, 
          defaultTimeStart:  initialTimelineState.defaultTimeEnd, 
          defaultTimeEnd:  initialTimelineState.defaultTimeEnd
      }
      return Object.assign({}, state, newState);
      
    }
    default:
      return state;
  }
};

export default routeReducer;
