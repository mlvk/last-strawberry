import Ember from 'ember';
import colors from 'last-strawberry/constants/colors';

function buildStyles(data) {
  const str = Object.keys(data).reduce((acc, cur) => `${acc}${cur}:${data[cur]};`, '');
  return new Ember.Handlebars.SafeString(str);
}

export function rpIcon(params) {
  const routeVisit = params[0];
  const index = params[1];
  const colorScheme = routeVisit ? routeVisit.get('routePlan.colorScheme') : {backgroundColor:colors.LIGHT_GREY, color:'white'};

  const labelStyles = {
    'text-align': 'center',
    'width': '2em',
    'z-index': '1000',
    'position': 'absolute',
    'top': '-5px',
    'left': '2px',
    'color': colorScheme.color,
    'font-size': '0.9em'
  }

  const iconFillStyles = {
    'fill':colorScheme.backgroundColor
  }

  const html =
    `<div class='marker'>
      <p style=${buildStyles(labelStyles)}>${routeVisit.get('position') + 1}</p>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 40">
        <path style=${buildStyles(iconFillStyles)} d="M12.5,0C5.7,0,0,5.9,0,12.3c0,2.9,1.6,6.6,2.8,9.1L12.5,40l9.6-18.6c1.2-2.5,2.9-6,2.9-9.1
      		C25,5.9,19.4,0,12.5,0L12.5,0z"/>
      </svg>
    </div>`;

  return L.divIcon({
    className: 'route-plan-marker',
    html,
    iconSize: [25, 40],
    iconAnchor: [12.5, 40],
    popupAnchor: [0, -35]
  })
}

export default Ember.Helper.helper(rpIcon);
