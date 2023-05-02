# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here



### **Create CustomIdMap database table to store links between custom and internal ids of Agents**
Acceptance criteria:
- the table must contain columns internal_id and custom_id;
- internal_id must be reference to the Agent id in Agents table;
- the table must have an index on the internal_id column, because in most queries we need to find custom_id by internal_id.

### **Create a mapper function converting getShiftsByFacility result to replace internal agent id with custom id**
Acceptance criteria:
- function has to accept array of Shifts with some metadata about the Agent;
- function has to return the same array, with Agents' internal ids replaced with custom ids;
- function has to use cache to reduce the number of requests to the database.

### **Create tests for mapper function**
Acceptance criteria:
- output of the function should be the same as input expecting Agent id;
- internal ids of all Agents have to be replaced with external ids;
- database should be connected not more than one time per each Agent ID (cache has to be used for subsequent lookups)

### **Change getShiftsByFacility output before generating report with mapper function**
Acceptance criteria:
- reports must be generated with custom user ids instead of internal ids.

Notes: 
- depending on how often we need to generate reports for the same Facility we probably need to move the cache to the global scope to use it from different function's calls;
- we could also make changes to the getShiftsByFacility function to return Shifts with custom Agent id already. But since this function is already in production, it is better to extend it without modification.