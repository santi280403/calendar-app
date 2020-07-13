import { Request, Response } from 'express';

import cloudinary from 'cloudinary';
import fs from 'fs-extra';
import pool from '../database';

import { Info } from '../interface/info_personal';

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

class Profile {

    async getProfile(req: Request, res: Response) {
        let { id } :any = req.user;
        let user = req.user;
        const info: any = await pool.query('SELECT * FROM information_personal WHERE user_id', [id]);
        const result = info[0];
        res.render('profile/profile', {
            layout: 'session',
            user,
            result
        })
    }

    addInformationProfile(req: Request, res: Response) {
        let user = req.user;
        res.render('profile/add', {
            layout: 'session',
            user
        });
    }

    async sendInformation(req: Request, res: Response) {
        console.log(req.body);
        const { id }: any = req.user;
        const { firstname, lastname } = req.body;

        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path);
            const newInformation: Info = {
                firstname,
                lastname,
                imageURL: result.url,
                user_id: id
            }
            const sendData: any = await pool.query('INSERT INTO information_personal SET ?', [newInformation]);
            newInformation.id = sendData.id;
            fs.unlink(req.file.path);
            res.redirect('/profile');
            return newInformation;

        } catch (error) {
            console.log(error)
        }
    }

    async getCalendar(req: Request, res: Response) {
        let { id } :any = req.user;
        let user = req.user;
        const info: any = await pool.query('SELECT * FROM information_personal WHERE user_id', [id]);
        const result = info[0];
        res.render('calendar/calendar', {
            layout: 'session',
            user,
            result
        })
    }

}

const profile = new Profile();

export default profile;