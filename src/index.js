import * as d3 from 'd3';
import {round, debounce} from 'lodash';

$('#note').modal();

let run = debounce(function() {
    const EARTH_AGE = 4500000000;
    let width = window.innerWidth;
    let formatter = d3.format(",d");

    $(window).on('scroll', (d) => {
        let value = (window.pageYOffset) * 500;

        if (value < 0) {
            value = 0;
        }

        let val = (value / EARTH_AGE) * 100;
        let rounded = round(val, 3) + '';

        let test_value;
        if (rounded === undefined) {
            test_value = 0;
        } else {
            let num_count = rounded.split('.');

            if (num_count.length > 1) {
                test_value = num_count[1].length;
            } else {
                test_value = num_count[0].length;
            }
        }

        if (test_value === 2) {
            rounded = rounded + '0';
        } else if (test_value === 1) {
            rounded = rounded + '00';
        }

        $('#date').text(formatter(value));
        $('#pct').text(rounded);
    });

    let clock = $('#clock');
    let legend = $('#legend, #events');

    if (width < 500) {
        clock.css('font-size', '1.1em');
    }  else if (width < 1000) {
        clock.css('font-size', '2em');
    } else {
        clock.css('font-size', '3em');
    }

    if (width < 800) {
        legend.css('font-size', '1em');
    } else {
        legend.css('font-size', '1.5em');
    }
}, 250);

run();

window.addEventListener('resize', run);
