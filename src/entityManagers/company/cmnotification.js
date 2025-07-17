import { MODELS } from '../../sequelize.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export class cmnotificationmanager {
    /* Final Code Functions */
    static async create(dataArray) {
        const { NotificationTable } = MODELS;
        let datamap = dataArray[0];
        console.log("3333333333333333", datamap);
        let notificationtable;
        try {
            notificationtable = await NotificationTable.create({
                eventposttableId: datamap.eventposttableId || null,
                logintableId: datamap.logintableId || null,
            });

            // Send notification email
            try {
                await this.sendNotificationEmail({
                    to: 'kranthikiran605132@gmail.com',
                    subject: 'Notification - Event Booking',
                    text: 'You got booking please take look on ID :'+ notificationtable.id,
                });
            } catch (emailError) {
                console.error('Failed to send email notification:', emailError.message);
            }

            return notificationtable;
        } catch (error) {
            console.error('Database Error:', error.message);
            throw error; // Rethrow the error to handle it in the calling code
        }
    }

    static async sendNotificationEmail({ to, subject, text }) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kranthikiran7702@gmail.com',
                pass: 'hqao bmig qawq czcr',
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent successfully:', info.response);
        } catch (error) {
            console.error('Error sending email:', error.message);
            throw error;
        }
    }

    static async list() {
        const { NotificationTable, LoginTable, EventPostTable } = MODELS;
        try {
            return await NotificationTable.findAll({
                include: [{ model: LoginTable }, { model: EventPostTable }],
            });
        } catch (error) {
            console.error('Error fetching notification list:', error.message);
            throw error;
        }
    }

    static async listid(dataArray) {
        const { EventPostTable } = MODELS;
        let datamap = dataArray[0];
        try {
            return await EventPostTable.findByPk(datamap.id);
        } catch (error) {
            console.error('Error fetching event post by ID:', error.message);
            throw error;
        }
    }

    static async update(dataArray) {
        const { EventPostTable } = MODELS;
        let datamap = dataArray[0];
        try {
            return await EventPostTable.update(
                {
                    title: datamap.title || null,
                    description: datamap.description || null,
                    minprice: datamap.minprice || null,
                    maxprice: datamap.maxprice || null,
                    youtubevideolink: datamap.youtubevideolink || null,
                    filename: datamap.filename || null,
                },
                {
                    where: { id: datamap.id },
                }
            );
        } catch (error) {
            console.error('Error updating event post:', error.message);
            throw error;
        }
    }

    static async destroy(dataArray) {
        const { EventPostTable } = MODELS;
        let datamap = dataArray[0];
        try {
            await EventPostTable.destroy({
                where: { id: datamap.id },
            });
        } catch (error) {
            console.error('Error deleting event post:', error.message);
            throw error;
        }
    }
}
