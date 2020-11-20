import Handlebars from 'handlebars';

export const mainPopUpTemplate = Handlebars.compile(`
<div class="row" >
  <div class="col-sm">
    <div class="{{popupType}}">
        {{{htmlContent}}}
    </div>
  </div>
</div>`);

export const wikipediaTemplate = Handlebars.compile(`
<p>{{name}}</p>

{{#with wikidataDetails}}
{{#if picture}}
<p class=""> <img src="{{picture}}"/></p>
{{/if}}

<p class="">{{../birthYear}} - {{../deathYear}}</p>

{{#if description}}
<p class=""> {{description}}</p>
{{/if}}

{{#if occupations}}
<p class="">{{occupations}}</p>
{{/if}}
{{/with}}

{{#if isFemale}}
{{#if link}}
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
{{/if}}
{{/if}}
`);
