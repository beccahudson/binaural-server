const express = require('express');
const AdminService = require('./admin-service');
const { requireAuth } = require('../middleware/jwt-auth');
const bodyParser = express.json();

const adminRouter = express.Router();

adminRouter
	.route('/admin/:id')
	.all(requireAuth)
	.get((req, res, next) => {
		AdminService.getAllUsers(req.app.get('db'))
			.then((users) => {
				res.status(200).json(users);
			})
			.catch(next);
	});
    
adminRouter
    .route('/admin/:user_id/:id')
    .all(requireAuth)
    .delete(bodyParser, (req, res, next) => {
		const id = req.params.id;
        const email = req.body.email;
        
        console.log(id,email)

		AdminService.deleteUser(req.app.get('db'), id, email)
			.then((user) => {
				if (!user) {
					return res
						.status(404)
						.json({ error: { message: 'User not found/does not exist' } });
				}
				res.status(204).end();
			})
			.catch(next);
    });
    

module.exports = adminRouter;
