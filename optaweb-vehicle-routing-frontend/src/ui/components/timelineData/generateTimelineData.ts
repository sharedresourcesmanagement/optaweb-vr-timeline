import moment from 'moment'
import { LatLng, Location, RouteWithTrack } from 'store/route/types';

const day = 1000 * 60 * 60 * 24;

export default function (routes: RouteWithTrack[] = []) {
  let randomSeed = Math.floor(Math.random() * 1000);
  var groups: { id: string; title: string; rightTitle: string; label: string; route: RouteWithTrack}[] = [];
  let items: any[] = [];
  routes.forEach(function(routeItem, i:any) {
    console.log("generateTimeline for each route working"+routeItem)
    return groups.push({      
      id: `${i + 1}`,
      title: 'Title:' + routeItem.vehicle.name,
      rightTitle: 'Right Title:' + routeItem.vehicle.name,
      label: 'Label: ' + routeItem.vehicle.name,
      route: routeItem
      // bgColor: randomColor({ luminosity: 'light', seed: randomSeed + i }));
    })
  }); 
  groups.forEach(function(groupItem, i: any) {
    groupItem.route.visits.forEach(function(visitItem, j: any) {
      const startDate = day*(j*30);
      const startValue = Math.floor(moment(startDate).valueOf() / 10000000) * 10000000;
      const endValue = day*((j+1)*30 -2);
      return items.push({
        id: j + '',
        group: groupItem,
        title: 'Title Item: ' + visitItem.description,
        start: startValue,
        end: endValue,
        //canMove: startValue > new Date().getTime(),
        //canResize: startValue > new Date().getTime() ? (endValue > new Date().getTime() ? 'both' : 'left') : (endValue > new Date().getTime() ? 'right' : false),
        className: (moment(startDate).day() === 6 || moment(startDate).day() === 0) ? 'item-weekend' : '',
      // bgColor: randomColor({ luminosity: 'light', seed: randomSeed + i, format:'rgba', alpha:0.6 }),
        //selectedBgColor: randomColor({ luminosity: 'light', seed: randomSeed + i, format:'rgba', alpha:1 }),
        //color: randomColor({ luminosity: 'dark', seed: randomSeed + i }),
      // itemProps: {
      //   'data-tip': faker.hacker.phrase(),
      //   
      });
    }); 
  });
  
  /* 
    groups = routes.map(function(route: { visits: any[]; vehicle: { name: any; }; }, i: any) {      
      id: `${i + 1}`,
      title: 'Title:' + route.vehicle.name,
      rightTitle: 'Right Title:' + route.vehicle.name,
      label: 'Label: ' + route.vehicle.name
    // bgColor: randomColor({ luminosity: 'light', seed: randomSeed + i })
      route.visits.map(function(location: Location, j: any) {
          const startDate = day*(j*30);
          const startValue = Math.floor(moment(startDate).valueOf() / 10000000) * 10000000;
          const endValue = day*((j+1)*30 -2);
          items.push({
            id: j + '',
            group: groupIterator,
            title: 'Title Item: ' + location.description,
            start: startValue,
            end: endValue,
            //canMove: startValue > new Date().getTime(),
            //canResize: startValue > new Date().getTime() ? (endValue > new Date().getTime() ? 'both' : 'left') : (endValue > new Date().getTime() ? 'right' : false),
            className: (moment(startDate).day() === 6 || moment(startDate).day() === 0) ? 'item-weekend' : '',
          // bgColor: randomColor({ luminosity: 'light', seed: randomSeed + i, format:'rgba', alpha:0.6 }),
            //selectedBgColor: randomColor({ luminosity: 'light', seed: randomSeed + i, format:'rgba', alpha:1 }),
            //color: randomColor({ luminosity: 'dark', seed: randomSeed + i }),
          // itemProps: {
          //   'data-tip': faker.hacker.phrase(),
          // }
          });
    });   */



    /*  for (let i = 0; i < groupCount; i++) {
      groups.push({
        id: `${i + 1}`,
        title: faker.name.firstName(),
        rightTitle: faker.name.lastName(),
        label: `Label ${faker.name.firstName()}`,
        bgColor: randomColor({ luminosity: 'light', seed: randomSeed + i })
      })
    } */

   // items = items.sort((a, b) => b - a)
  
  
  
  return { groups, items }
}