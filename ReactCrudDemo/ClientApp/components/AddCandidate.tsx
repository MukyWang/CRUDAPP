import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { CandidateData } from './FetchCandidate';

interface AddCandidateDataState {
    title: string;
    loading: boolean;
    candidateData: CandidateData;
}

export class AddCandidate extends React.Component<RouteComponentProps<{}>, AddCandidateDataState> {

    constructor(props) {

        super(props);

        this.state = { title: "", loading: true, candidateData: new CandidateData };

        var candidateid = this.props.match.params["candidateid"];

        // Set state for Edit candidate
        if (candidateid > 0) {

            fetch('api/Candidate/CandidateDetails/' + candidateid)
                .then(response => response.json() as Promise<CandidateData>)
                .then(data => {
                    this.setState({ title: "Edit Candidate Information", loading: false, candidateData: data });
                });
        }

        // Set state for Add candidate
        else {

            this.state = { title: "Add new candidate", loading: false, candidateData: new CandidateData };
        }


        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();

        return <div>
            <h1>{this.state.title}</h1>
            <h3>Candidate</h3>
            <hr />
            {contents}
        </div>;
    }

    // Handle the submit form event.
    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        // PUT request for Edit candidate.
        if (this.state.candidateData.candidateId) {
            fetch('api/Candidate/Edit', {
                method: 'PUT',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchcandidate");
                })
        }

        // POST request for Add candidate.
        else {
            fetch('api/Candidate/Create', {
                method: 'POST',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchcandidate");
                })
        }
    }

    // Handle Cancel button click event.
    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchcandidate");
    }

    // Returns the HTML Form to the render() method.
    private renderCreateForm() {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="candidateId" value={this.state.candidateData.candidateId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.candidateData.name} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Gender">Gender</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="gender" defaultValue={this.state.candidateData.gender} required>
                            <option value="">-- Select Gender --</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="N/A">Prefer not to say</option>
                        </select>
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Position">Position</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="position" defaultValue={this.state.candidateData.position} required>
                            <option value="">-- Select Position --</option>
                            <option value="Graduate Developer">Graduate Developer</option>
                            <option value="Junior Developer">Junior Developer</option>
                            <option value="Senior Developer">Senior Developer</option>
                        </select>
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Notation" >Notation</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Notation" defaultValue={this.state.candidateData.notation} required />
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }





}