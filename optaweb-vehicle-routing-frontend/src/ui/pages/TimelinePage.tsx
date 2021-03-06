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

import {
  Form,
  FormSelect,
  FormSelectOption,
  GutterSize,
  Split,
  SplitItem,
  Text,
  TextContent,
  TextVariants,
  Button,
} from '@patternfly/react-core';
import * as React from 'react';
import { connect } from 'react-redux';
import { clientOperations } from 'store/client';
import { UserViewport } from 'store/client/types';
import { routeOperations } from 'store/route';
import { LatLng, Location, RouteWithTrack } from 'store/route/types';
import { AppState } from 'store/types';
import LocationList from 'ui/components/LocationList';
import RouteMap from 'ui/components/RouteMap';
import TimelineChart from 'ui/components/TimelineChart';
import 'ui/components/Timeline.css';
import "./chartStyleSticky/chartStyleSticky.css";
import generateFakeData from 'ui/components/generate-fake-data/generate-fake-data';
import generateTimelineData from 'ui/components/timelineData/generateTimelineData';

export interface StateProps {
  depot: Location | null;
  visits: Location[];
  routes: RouteWithTrack[];
  userViewport: UserViewport;
}


export interface GanttProps {
  groups: any;
  items: any; 
}

export interface DispatchProps {
  addHandler: typeof routeOperations.addLocation;
  removeHandler: typeof routeOperations.deleteLocation;
  updateViewport: typeof clientOperations.updateViewport;
}

const mapStateToProps = ({ plan, serverInfo, userViewport }: AppState): StateProps => ({
  depot: plan.depot,
  visits: plan.visits,
  routes: plan.routes,
  userViewport,
});

const mapDispatchToProps: DispatchProps = {
  addHandler: routeOperations.addLocation,
  removeHandler: routeOperations.deleteLocation,
  updateViewport: clientOperations.updateViewport,
};

export type RouteProps = DispatchProps & StateProps & GanttProps;

export interface RouteState {
  selectedId: number;
  selectedRouteId: number;
}

export class TimelinePage extends React.Component<RouteProps, RouteState> {
  constructor(props: RouteProps) {
    super(props);

    this.state = {
      selectedId: NaN,
      selectedRouteId: 0,
     
    };
    this.onSelectLocation = this.onSelectLocation.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    
    const groups = [];
    const items =[];

   

  }

  handleMapClick(e: any) {
    this.props.addHandler({ ...e.latlng, description: '' });
  }

  onSelectLocation(id: number) {
    this.setState({ selectedId: id });
  }


  
  render() {
    
    const { selectedId, selectedRouteId } = this.state;
    const {
      userViewport,
      depot,
      visits,
      routes,
      removeHandler,
      updateViewport,
    } = this.props;

    // FIXME quick hack to preserve route color by keeping its index
    const filteredRoutes = (
      routes.map((value, index) => (index === selectedRouteId ? value : { visits: [], track: [] }))
    );
    const filteredVisits: Location[] = routes.length > 0 ? routes[selectedRouteId].visits : [];
    console.log("TimelinePage Render this.props.routes");
    console.log(this.props.routes);
    console.log("TimelinePage Render this.props.groups");
    console.log(this.props.groups);
    return (
      <>
        <TextContent>
          <Text component={TextVariants.h1}>Timeline</Text>
        </TextContent>
        <Button>
           
        </Button>
        <Split gutter={GutterSize.md}>         
          <SplitItem isFilled style={{
            overflowY: 'auto',
            overflowX: 'auto',
            height: '100%',
            width: '100%'
          }}>
            <TimelineChart/>            
          </SplitItem>
          <SplitItem
            isFilled={false}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
          </SplitItem>
          TESTE
        </Split>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimelinePage);
