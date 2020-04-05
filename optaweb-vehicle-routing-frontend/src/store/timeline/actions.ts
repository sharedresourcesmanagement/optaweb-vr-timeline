/*
 * Copyright 2019 Red Hat, Inc. and/or its affiliates.
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

import { ActionFactory } from '../types';
import { ActionType, ResetTimelineAction, UpdateTimelineAction, GanttData } from './types';

export const updateTimelineView: ActionFactory<GanttData, UpdateTimelineAction> = ganttData => ({
  type: ActionType.UPDATE_CHART,
  ganttData,
}); 

export const resetTimelineView: ActionFactory<void, ResetTimelineAction> = () => ({
  type: ActionType.RESET_CHART
});
