import moment from "moment";
import generateTimelineData from 'ui/components/timelineData/generateTimelineData';
import * as React from 'react';
import { connect } from 'react-redux';
import { clientOperations } from 'store/client';
import { UserViewport } from 'store/client/types';
import { routeOperations } from 'store/route';
import { LatLng, Location, RouteWithTrack } from 'store/route/types';
import { AppState } from 'store/types';
import LocationList from 'ui/components/LocationList';
import RouteMap from 'ui/components/RouteMap';
import generateFakeData from "./generate-fake-data/generate-fake-data";

/* const Timeline = require('react-calendar-timeline');
const TimelineHeaders = require('react-calendar-timeline');
const SidebarHeader = require('react-calendar-timeline');
const DateHeader = require('react-calendar-timeline'); */
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader
} from "react-calendar-timeline/lib";


var keys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "title",
  itemDivTitleKey: "title",
  itemGroupKey: "group",
  itemTimeStartKey: "start",
  itemTimeEndKey: "end",
  groupLabelKey: "title"
};

export interface TimelineChartStateProps {
  depot: Location | null;
  visits: Location[];
  routes: RouteWithTrack[];
  groups: any[],
  items: any[],
  defaultTimeStart: any,
  defaultTimeEnd: any
}

export interface DispatchProps {
  addHandler: typeof routeOperations.addLocation;
  removeHandler: typeof routeOperations.deleteLocation;
  updateViewport: typeof clientOperations.updateViewport;
}

export type TimelineChartProps = DispatchProps & TimelineChartStateProps;

const mapDispatchToProps: DispatchProps = {
  addHandler: routeOperations.addLocation,
  removeHandler: routeOperations.deleteLocation,
  updateViewport: clientOperations.updateViewport,
};

export interface TimelineState {
  depot: any,
  visits: Location[],
  routes: RouteWithTrack[],
  groups: any[],
  items: any[],
  defaultTimeStart: any,
  defaultTimeEnd: any
}

const mapStateToProps = ({ plan, ganttData }: AppState): TimelineChartStateProps => ({
  depot: plan.depot,
  visits: plan.visits,
  routes: plan.routes,
  groups: ganttData.groups,
  items: ganttData.items,
  defaultTimeStart: ganttData.defaultTimeStart,
  defaultTimeEnd: ganttData.defaultTimeEnd
});

export interface Iprops {
  getRootProps: any
}

export class TimelineChart extends React.Component<TimelineChartProps,TimelineState> {
  constructor(props: TimelineChartProps) {
    super(props);

    //const { groups, items } = generateFakeData(150);
    console.log("Constructor props.routes");
    console.log(props.routes);
    const groupsAndItens = generateTimelineData(props.routes)
    const groups_Constructor = groupsAndItens.groups;
    const items_Constructor = groupsAndItens.items;
    console.log("Constructor groups");
    console.log(groups_Constructor);
    console.log("Constructor items");
    console.log(items_Constructor);

     const defaultTimeStart = moment()
      .startOf("day")
      .toDate();
    const defaultTimeEnd = moment()
      .startOf("day")
      .add(1, "day")
      .toDate(); 
    this.state = {
      depot: props.depot,
      visits: props.visits,
      routes: props.routes,
      groups: groups_Constructor,
      items: items_Constructor,
      defaultTimeStart: props.defaultTimeStart,
      defaultTimeEnd: props.defaultTimeEnd
    }; 
  }
 

  render() {
    console.log("TimelineChart RENDER");
   // const { groups, items, defaultTimeStart, defaultTimeEnd } = this.props;
    const groups = this.state.groups;
    const items = this.state.items;
    const defaultTimeStart = this.state.defaultTimeStart;
    const defaultTimeEnd = this.state.defaultTimeEnd;
    console.log("TimelineChart Groups from props RENDER");
    console.log(groups);
    return (
      <Timeline
        groups={groups}
        items={items}
        keys={keys}
        sidebarContent={<div>Above The Left</div>}
        itemsSorted
        itemTouchSendsClick={false}
        stackItems
        itemHeightRatio={0.75}
        showCursorLine
        canMove={false}
        canResize={false}
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
      >
        <TimelineHeaders className="sticky">
          <SidebarHeader>
            {({ getRootProps }:Iprops) => {
              return <div {...getRootProps()}>Left</div>;
            }}
          </SidebarHeader>
          <DateHeader unit="primaryHeader" />
          <DateHeader />
        </TimelineHeaders>
      </Timeline>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimelineChart);