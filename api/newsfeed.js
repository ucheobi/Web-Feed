const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());


const issues = [
    {
        id: 1, 
        status: 'Open', 
        owner: 'Uche',
        created: new Date('2019-05-23'), 
        effort: 5, 
        completionDate: undefined,
        title: 'Error in console when clicking Add'
    },
    {
        id: 2, 
        status: 'Assigned', 
        owner: 'Lyna',
        created: new Date('2019-06-12'), 
        effort: 15, 
        completionDate: new Date('2019-05-30'),
        title: 'Missing bottom border on panel'
    },
    {
        id: 3, 
        status: 'Assigned', 
        owner: 'Obiefula',
        created: new Date('2019-06-19'), 
        effort: 10, 
        completionDate: new Date('2019-07-28'),
        title: 'Username or password error'
    }
];



app.get('/api/issues', (req, res) => {
    const metadata = { total_count: issues.length };
    res.json({ _metadata: metadata, records: issues });
});


app.post('/api/issues', (req, res) => {
    const newIssue = req.body;
    newIssue.id = issues.length + 1;
    newIssue.created = new Date();
    if(!newIssue.status)
        newIssue.status = 'New';
    
    if(err) {
        res.status(422).json({ message: `Invalid request: ${err}`});
        return;
    }
    issues.push(newIssue);

    res.json(newIssue);
});

app.listen(3000, () => {
    console.log('App started on port 3000');
});
