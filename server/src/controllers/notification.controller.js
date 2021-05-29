const Notification = require("../models/notification.model")
const responseHandler = require("../helpers/responseHandler");

const ObjectID = require('mongodb').ObjectID;

const getNotifications = async(req, res) => {
    try{
        const notifications = await Notification.find({notificationFor: req.user._id, status: "unread"})
                                    .sort("-createdAt")
        
        if(!notifications || notifications.length===0){
            return res
            .status(200)
            .json(
                responseHandler(
                    true,
                    200,
                    "no new notifications",
                )
            );
        }

        return res
        .status(200)
        .json(
            responseHandler(
                true,
                200,
                "unread notifications!",
                {notifications}
            )
        );
        
    }

    catch(e){
        console.log(e)
        return res
        .status(400)
        .json(
            responseHandler(
                false,
                400,
                "something went wrong!"
            )
        )
    }

}

const getNotification = async(req, res) => {
    try{
        const notification = await Notification.findOne({_id: req.params.id})
        if(!ObjectID.isValid(req.params.id)){
            return res
            .status(400)
            .json(
                responseHandler(
                    false,
                    400,
                    "invalid notification id!"
                )
            );
        }
        if(!notification){
            return res
            .status(400)
            .json(
                responseHandler(
                    false,
                    400,
                    "notification does not exist!"
                )
            );
        }

        if(notification.notificationFor.toString() !== req.user._id.toString()){
            return res
            .status(400)
            .json(
                responseHandler(
                    false,
                    400,
                    "notification not intended to you!"
                )
            );
        }

        if(notification.status === 'unread'){
            console.log("in")
            notification.status = 'read'
            notification.save()
        }

        return res
        .status(200)
        .json(
            responseHandler(
                true,
                200,
                "notification",
                {notification}
            )
        );
           
    }
    catch(e){
        console.log(e)
        return res
        .status(400)
        .json(
            responseHandler(
                false,
                400,
                "something went wrong!"
            )
        )
        
    }

}

module.exports = notificationController = {
    getNotifications,
    getNotification,
};