import { Stream } from 'xstream';
import { run } from '@cycle/run';
import { DOMSource, makeDOMDriver, VNode } from '@cycle/dom';

const JSX = { createElement: require('snabbdom-jsx').html };


type Sources = {
    DOM: DOMSource
};

type Sinks = {
    DOM: Stream<VNode>
};


function intent(DOM: DOMSource): Stream<string>
{
    return DOM.select('.field').events('input')
        .map(e => (e.target as HTMLInputElement).value);
};

function model(change$: Stream<string>): Stream<string>
{
    return change$.startWith('');
};

function view(value$: Stream<string>): Stream<VNode>
{
    return value$.map((value) =>
        <div>
            <label>
                Name:
                <input type="text" className="field" />
            </label>
            <hr />
            <h1>{ `Hello, ${value}` }</h1>
        </div>
    );
};

function main(sources: Sources): Sinks
{
    const change$ = intent(sources.DOM);
    const value$  = model(change$);
    const vdom$   = view(value$);

    return { DOM: vdom$ };
};


// Bootstrap the Cycle.js Application
// ============================================================================
document.addEventListener('DOMContentLoaded', () =>
{
    run(main as any, { DOM: makeDOMDriver('#app-container') } as any);
});