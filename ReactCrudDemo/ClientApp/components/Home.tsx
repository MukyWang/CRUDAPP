import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <h1>Hello, BizData!</h1>
            <p>This application is to demonstrate the CRUD application.</p>
            <p>This app is bulit under those requirements:</p>
            <ul>
                <li><strong>ASP.NET Core Web Application</strong> </li>
                <li><strong>EF Core database</strong> </li>
                <li><strong>Web API controller</strong>: Get/Put/Post/Delete commands  </li>
                <li><strong>TypeScript front end framework</strong>: React </li>
                <li><strong>Single page web application</strong>: Allow client side editing of tasks from the Web API controller </li>
            </ul>
        </div>;
    }
}
