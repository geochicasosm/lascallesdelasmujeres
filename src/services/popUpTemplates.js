import Handlebars from 'handlebars';

export const popUpWidths = {
  Male: '240px',
  Female: '350px',
};

export const mainPopUpTemplate = Handlebars.compile(`
<div class="row" >
  <div class="col-sm">
    <div class="row {{popupType}}">
        {{{htmlContent}}}
    </div>
  </div>
</div>`);

export const contentPopUpTemplate = Handlebars.compile(`


{{#if isFemale}}{{#if link}}
<div class="picture col-6 mx-auto">
  {{#with wikidataDetails}}
  {{#if picture}}
  <img src="{{picture}}"/>
  {{/if}}
  {{/with}}
</div>
{{/if}}{{/if}}

<div class="details col">
  <p class="name">{{name}}</p>

  {{#if isFemale}}{{#if link}}
  <p class="">
      <a  class="btn btn-light" target="_blank" href='{{link}}'>
          <i class="fab fa-wikipedia-w"></i>
      </a>
  </p>
  {{else}}
  <p class="">
    <a  class="btn btn-light disabled" target="_blank" href='{{link}}'>
    <i class="fab fa-wikipedia-w"></i>
    </a>
  </p>
  <span class="badge badge-secondary">
    <i class="fas fa-exclamation"></i>&nbsp;
    {{popupText}}
  </span>
  {{/if}}{{/if}}

  {{#with wikidataDetails}}
  <p class="dates">{{../birthYear}} - {{../deathYear}}</p>

  {{#if description}}
  <p class="description"> {{description}}</p>
  {{/if}}

  {{#if occupations}}
  <p class="occupations">{{occupations}}</p>
  {{/if}}
  {{/with}}
</div>

`);
