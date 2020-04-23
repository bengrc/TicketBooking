const express = require('express');
const app = express();
const ticketOrderRoute = express.Router();
var ObjectId = require('mongodb').ObjectID;
// Ticket model
let Ticket = require('../models/ticket');
let Order = require('../models/order')
let OrderModel = require('../models/order');

ticketOrderRoute.route('/order/removeTicket').post((req, res, next) => {
    Ticket.findById(req.body.ticketId, (error, ticket) => {
        if (error) {
            return next(error);
        } else {
            console.log(ticket)
            Order.findByIdAndUpdate(req.body.orderId,
                {
                  $unset: { "ticketsBooked": ticket }
                },
                (error, data) => {
                    if (error) {
                        return next(error);
                    } else {
                        res.json(data);
                        if (data.ticketsBooked.length == 0) {
                            Order.findByIdAndRemove(req.body.orderId, (error, data) => {
                                if (error) {
                                    return next(error);
                                } else {
                                    res.status(200).json({
                                    msg: data
                                    });
                                }
                            });
                            
                        }
                        console.log('Order successfully updated!');
                    }
                }
            ); 
        }
    }); 
   
})


ticketOrderRoute.route('/ticket/book').post((req, res, next) => {
    Order.find({'userId': req.body.userId }, function (err, order) {
        if (order.length > 0) {
            Ticket.findById(req.body.ticketId, (error, ticket) => {
                if (error) {
                    return next(error);
                } else {
                    console.log("Update order");
                    Order.findByIdAndUpdate(order[0].id,
                        {
                          $addToSet: { "ticketsBooked": ticket }
                        },
                        (error, data) => {
                            if (error) {
                                return next(error);
                            } else {
                                res.json(data);
                                console.log('Order successfully updated!');
                            }
                        }
                      );
                }
            });   
        } else {
            Order.create({"userId": req.body.userId, "ticketsBooked": [], "payment": false}, (error, data) => {
                if (error) {
                    return next(error);
                } else {
                    console.log('Order successfully added!');
                    console.log(data.id)
                    Ticket.findById(req.body.ticketId, (error, ticket) => {
                        if (error) {
                            return next(error);
                        } else {
                            console.log("Update order");
                            Order.findByIdAndUpdate(data.id,
                                {
                                  $addToSet: { "ticketsBooked": ticket }
                                },
                                (error, data) => {
                                    if (error) {
                                        return next(error);
                                    } else {
                                        res.json(data);
                                        console.log('Order successfully updated!');
                                    }
                                }
                              );
                        }
                    });   
                    
                }
            });           
        }
    });
})


/* Ticket Requests */

// Add Ticket
ticketOrderRoute.route('/ticket/create').post((req, res, next) => {
    Ticket.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
            console.log('Transaction successfully added!');
        }
    });
});

// Get all tickets
ticketOrderRoute.route('/tickets').get((req, res) => {
    Ticket.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

// Get single ticket
ticketOrderRoute.route('/ticket/:id').get((req, res) => {
    Ticket.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

// Update ticket
ticketOrderRoute.route('/ticket/:id').put((req, res, next) => {
    Ticket.findByIdAndUpdate(req.params.id,
    {
      $set: req.body
    },
    (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
            console.log('Ticket successfully updated!');
        }
    }
  );
});

// Delete Ticket
ticketOrderRoute.route('/ticket/delete/:id').delete((req, res, next) => {
    Ticket.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
        return next(error);
    } else {
        res.status(200).json({
        msg: data
        });
    }
  });
});

/* Order Requests */

// Add Order
ticketOrderRoute.route('/order/create').post((req, res, next) => {
    Order.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
            console.log('Order successfully added!');
        }
    });
});

// Get all tickets
ticketOrderRoute.route('/orders').get((req, res) => {
    Order.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

// Get single order 
ticketOrderRoute.route('/order/:id').get((req, res) => {
    Order.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

// Update Order
ticketOrderRoute.route('/order/:id').put((req, res, next) => {
    Order.findByIdAndUpdate(req.params.id,
    {
      $set: req.body
    },
    (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
            console.log('Ticket successfully updated!');
        }
    }
  );
});

// Delete Ticket
ticketOrderRoute.route('/order/delete/:id').delete((req, res, next) => {
    Order.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
        return next(error);
    } else {
        res.status(200).json({
        msg: data
        });
    }
  });
});

module.exports = ticketOrderRoute;
