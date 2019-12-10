# Vehicle information from Statens Vegvesen (Norway)

Fetching vehicle information from the REST API on https://www.vegvesen.no and displaying it.

Example: https://www.vegvesen.no/ws/no/vegvesen/kjoretoy/kjoretoyoppslag/v1/kjennemerkeoppslag/kjoretoy/AA12345

## Features

- Javascript
- jQuery
- Materialize CSS framework
- Responsive design
- Passes HTML5 standards - https://validator.w3.org/nu/

## Description

This is a small application I created with HTML5, Javascript, jQuery and Materialize in order to display vehicle information from the REST API on https://www.vegvesen.no.
It features some custom Javascript coding to validate input with a Regex as well as dynamic display of the table displaying the information.

You need to enter a valid vehicle registration number (AA12345) and then the submit button will no longer be disabled and the table to show the information will fade in.
