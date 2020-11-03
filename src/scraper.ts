import Match from './models/Match';
import mongoose from 'mongoose';
import './database';
import fetch from 'node-fetch';
import { API } from './types/API';
mongoose.set('debug', true);

const endpoint =
    'https://footballapi-lcfc.pulselive.com/football/fixtures?teams=26&statuses=C&sort=desc';

const fetchAPI = ({ page = 0, pageSize = 100 } = {}): Promise<API> =>
    fetch(`${endpoint}&page=${page}&pageSize=${pageSize}`).then((res) =>
        res.json()
    );

Match.countDocuments({})
    .then((count) =>
        fetchAPI({ pageSize: 1 }).then((res) => ({
            apiCount: res.pageInfo.numEntries,
            count,
        }))
    )
    .then(({ apiCount, count }) => {
        if (apiCount > count) {
            const diff = apiCount - count;
            const maxPage = Math.ceil(diff / 100) - 1;
            const scrap = (
                page = 0,
                content: API['content'] = []
            ): Promise<API['content']> =>
                fetchAPI({ page }).then((res) =>
                    page < res.pageInfo.numPages && page < maxPage
                        ? scrap(page + 1, [...content, ...res.content])
                        : [...content, ...res.content]
                );
            console.log(`adding ${diff} elements`);
            scrap().then((content) => {
                const newElements = content.slice(0, diff).map((item) => ({
                    apiId: item.id,
                    date: item.kickoff.millis,
                    result: Object.fromEntries(
                        item.teams.map(({ team, score }) => [team.name, score])
                    ),
                }));
                console.log(newElements);
                Match.insertMany(newElements);
            });
        } else {
            console.log('Up to date');
        }
    })
    .then(() => mongoose.disconnect())
    .catch(console.error);
