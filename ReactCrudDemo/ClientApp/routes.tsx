import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchCandidate } from './components/FetchCandidate';
import { AddCandidate } from './components/AddCandidate';

export const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/fetchcandidate' component={FetchCandidate} />
    <Route path='/addcandidate' component={AddCandidate} />
    <Route path='/candidate/edit/:candidateid' component={AddCandidate} />
</Layout>;