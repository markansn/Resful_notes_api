# Resful_notes_api
A solution to Thirdfort's coding challenge

Utilising a Node.js server with Mongoose and a MongoDB backend.

**Running the application**
The server is started using the server.js file. Started the same as any other Node.js server. Npm packages should already be present in the node_modules file. The database the application communicates with is on the cloud so there is no need to download anything. However, the cloud service I am using operates a IP whitelist system so **I will need your IP in order to whitelist it.**

**How to use**
The API offers a series of routes to which HTTP requests can be sent. Combinations of routes and request types are used to handle different requests. Below are the different requests that can be sent and their purpose. Bear in mind I am presuming you are operating this server locally and on the default port 3000.


Note: In examples, replace {nodeId} with the id of the note found from the _id tag.

**List all notes:**
Get request at http://localhost:3000/notes

**Create a new note:**
Post request at http://localhost:3000/notes
Data:
name : String
content : String
tags : Array

**List all archived notes:**
Get request at http://localhost:3000/notes/archive

**Archive a note:**
Put request at http://localhost:3000/notes/{noteId}


**Read a note:**
Get request at http://localhost:3000/notes/{noteId}

**Update a note:**
Post request at http://localhost:3000/notes/{noteId}
Data:
name : String
content : String
tags : Array
It is only necessary to include data that you want to change. 

**Delete a note:**
Delete request at http://localhost:3000/notes/{noteId}

**List all notes with tags:**
Get request at http://localhost:3000/notes/tags/{tags}
Where {tags} is a series of tags separated by commas. eg. tag1,tag2,tag3

**Read an archived note:**
Get request at http://localhost:3000/notes/archive/{noteId}

**Unarchive a note:**
Put request at http://localhost:3000/notes/archive/{noteId}

**Delete an archived note:**
Delete request at http://localhost:3000/notes/archive/{noteId}

**List all archived notes with tags:**
Get request at http://localhost:3000/notes/archives/tags/{tags}
Where {tags} is a series of tags separated by commas. eg. tag1,tag2,tag3


**Choice of technology**

I decided that Node.js would be the right tool to use in this case as it would most closely reflect what I would be doing working for Thirdfort. I hope that through this task I can demonstrate a reasonable understanding of and aptitude for the software.

I decided to use MongoDB as it seemed to be the best way to rapidly develop this application. Database environments can be set up quickly and hosted in the cloud for free.  I did consider using a standard database environment using SQL for queries, but I decided this was the better and more modern approach. 

**Next steps**

The next big task in developing this API is handling different users. I would need to look into and set up some sort of OAuth style handshake with the client in order to authenticate users, and would need to securely store user data. Further to this I would look into securing the application entirely, using HTTPS to send data, and possibly encrypting the notes in the database to remove the risk of loss of sensitive data if the database is breached. 


