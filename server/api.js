const express = require('express');
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');
const apiRouter = express.Router();
const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
    allWork,
    createWork
  } = require('./db.js');

apiRouter.get('/minions', (req,res, next) => {
    const all = getAllFromDatabase('minions');
    res.send(all);
})

apiRouter.post('/minions', (req,res, next) => {
    const newMinion = req.body;
    if (typeof newMinion.salary === 'string') {
        newMinion.salary = Number(newMinion.salary);
    }

    if (typeof newMinion.name === 'string' ||
        typeof newMinion.title === 'string' ||
        typeof newMinion.weaknesses === 'string' ||
        typeof newMinion.salary === 'number') {
            const addnewMinion = addToDatabase('minions', newMinion);
            res.status(201);
            res.send(addnewMinion);
        } else (
            res.sendStatus(400)
        )
})

apiRouter.get('/minions/:id', (req,res,next) => {
    const id = req.params.id;
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        res.send(minion);
    } else {
        res.sendStatus(404);
    }

})

apiRouter.put('/minions/:id', (req,res,next) => {
    const body = req.body;
    const updated = updateInstanceInDatabase('minions', body);
    if (updated) {
        res.send(updated);
    } else {
        res.sendStatus(404);
    }
})

apiRouter.delete('/minions/:id', (req,res,next) => {
    const id = req.params.id;
    const deleteM = deleteFromDatabasebyId('minions', id);
    if (deleteM) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
})

apiRouter.get('/ideas', (req,res, next) => {
    const all = getAllFromDatabase('ideas');
    res.send(all);
})

apiRouter.post('/ideas', checkMillionDollarIdea, (req,res, next) => {
    const newIdea = req.body;
    const addnewIdea = addToDatabase('ideas', newIdea);
    if (addnewIdea) {
        res.status(201)
        res.send(addnewIdea);
    } else {
        res.sendStatus(400)
    }
})

apiRouter.get('/ideas/:id', (req,res,next) => {
    const id = req.params.id;
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
        res.send(idea);
    } else {
        res.sendStatus(404);
    }
})

apiRouter.put('/ideas/:id', (req,res,next) => {
    const body = req.body;
    const updated = updateInstanceInDatabase('ideas', body);
    if (updated) {
        res.send(updated);
    } else {
        res.sendStatus(404);
    }
})

apiRouter.delete('/ideas/:id', (req,res,next) => {
    const id = req.params.id;
    const deleteI = deleteFromDatabasebyId('ideas', id);
    if (deleteI) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
})

apiRouter.get('/meetings', (req,res, next) => {
    const all = getAllFromDatabase('meetings');
    if (all) {
        res.send(all);
    } else {
        res.sendStatus(404)
    }    
})

apiRouter.post('/meetings', (req,res, next) => {
    const newMeating = createMeeting();
    const addNew = addToDatabase('meetings', newMeating);
    if (addNew) {
        res.status(201);
        res.send(addNew);
    } else {
        res.sendStatus(400)
    }
  ;
})

apiRouter.delete('/meetings', (req,res,next) => {
    const deleteM = deleteAllFromDatabase('meetings');
    if (deleteM) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
})


apiRouter.get('/minions/:id/work', (req, res, next) => {
    const id = req.params.id;
    const testId = getFromDatabaseById('minions', id);
    if (!testId) {
        res.status(404);
        res.send()
    } else {
        const all = allWork.filter(work => 
            work.minionId === id)
        if (all.length > 0) {
            res.send(all);
        } else {
            res.sendStatus(404);
        }
    }
})

apiRouter.post('/minions/:id/work', (req, res, next) => {
    const id = req.params.id;
    const work =  req.body;
    const testId = getFromDatabaseById('minions', id);
    if (!testId) {
        res.status(404);
        res.send()
    } else {
        if (work) {
            addToDatabase('work', work);
            res.status(201);
            res.send(work)
        } else {
            res.sendStatus(404); 
        }
    }
})

apiRouter.put('/minions/:id/work/:workId', (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    const minionUnderId = getFromDatabaseById('minions', id);
    const minionUnderIdFromReq = getFromDatabaseById('minions', body.minionId);

    if (!minionUnderId) {
        res.status(404);
        res.send();
    } else if ( !minionUnderIdFromReq) {
        res.sendStatus(400); 
    } else {
        const updated = updateInstanceInDatabase('work', body);
        res.send(updated);
    }
})

apiRouter.delete('/minions/:id/work/:workId', (req, res, next) => {
    const {workId} = req.params;
    const work = allWork.filter(work => work.id === workId);
    if (work.length > 0) {
        deleteFromDatabasebyId('work', workId);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
})
module.exports = apiRouter;













