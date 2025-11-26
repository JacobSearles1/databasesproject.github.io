<h1 align="center">National Infrastructure Project Database</h1> 
<p align="center">By: Jacob Searles, Devon Portieous, Kaedon Soule</p>  

## Project Overview<sup>1.0</sup>
We aim to create a centralized database for projects happening in Canada including their current status, budget, location and name of the project to help organize and allow everyone to easily and cleanly access the information they would like to see by providing search and filtering options to help you sift through content to only see what you are interested in. For demonstration purposes we have used some data from the [Housing and Infrastructure Project Map](https://housing-infrastructure.canada.ca/gmap-gcarte/index-eng.html) to populate our table.

## Database Design<sup>2.0</sup>
Our tables include; Projects, Provinces, Contractors and Project Assignments. This allows us to track several projects by name and id as well as relevant information like budgets, which province they are in, and which contractors are responsible for which projects. Our final table of Project Assignments is a junction table that allows us to deal with the many-to-many relationships between Projects and Contractors. 

## Setup and Execution<sup>3.0</sup>
You will need: MYSQL Workbench downloaded and installed
<br>To create your own database:
  1. Open the provided file in MYSQL Workbench
  2. To create the database/populate the tables, click the lightning bolt or use the shortcut Ctrl+Shift+Enter to run the script.
  3. To verify the database and tables were populated we have included queries at the bottom of the script that you can highlight and run with Ctrl+Shift+Enter or click at the end of desired query and use Ctrl+Enter to run the line your cursor is on.

## Project Scope<sup>4.0</sup>
Our project aims to:
  - Track projects
  - Track which contractors work on which projects
  - Track project budgets
  - Provide ease of access
  - Provide Queries to help filter information in the SQL Database

Our project does not include:
  - Live tracking of the budget use
  - Does not update cost amount based on work done
  - Provide accurate estimates to when work will be done
  - Winning lottery numbers

Assumptions we made for demonstration purposes:
  - Multiple contractors can work on the same job
  - Contractors can work multiple jobs
  - Contractors can work in multiple provinces
