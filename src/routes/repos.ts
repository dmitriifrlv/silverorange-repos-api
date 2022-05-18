import { Router, Request, Response } from 'express';
import axios from 'axios';
import { Repo } from '../models/Repo';
import jsonData from '../../data/repos.json';
import dotenv = require('dotenv');

dotenv.config();

export const repos = Router();
const URL = process.env.URL as string;

const isForkedFalse = (item: Repo) => item.fork === false;

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  const reposData = await axios.get(URL);

  const filteredUrlData: Repo[] = reposData.data.filter((item: Repo) =>
    isForkedFalse(item)
  );
  const filteredJsonData: Repo[] = jsonData.filter((item) =>
    isForkedFalse(item)
  );
  const filteredData = filteredUrlData.concat(filteredJsonData);

  res.json(filteredData);
});
