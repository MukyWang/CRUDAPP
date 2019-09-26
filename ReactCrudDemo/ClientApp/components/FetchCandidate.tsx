import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

interface FetchCandidateDataState {
    candidateList: CandidateData[];
    loading: boolean;
}

// This class is to fetch all the candidates data and delete an existing candidate

export class FetchCandidate extends React.Component<RouteComponentProps<{}>, FetchCandidateDataState>{

    constructor() {

        super();
        this.state = { candidateList: [], loading: true };

        //Get all candidates data
        fetch('api/Candidate/GetAllCandidates')
            .then(response => response.json() as Promise<CandidateData[]>)
            .then(data => {
                this.setState({ candidateList: data, loading: false });
            });

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCandidateTable(this.state.candidateList);

        return <div>
            <h1>Candidate Data</h1>
            <p>
                <Link to="/addcandidate">Create new candidate</Link>
            </p>
            {contents}
        </div>;
    }

    // Handle Delete request 
    private handleDelete(id: number) {

        if (!confirm("Do you want to delete the candidate with Id: " + id))
            return;

        else {
            fetch('api/Candidate/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        candidateList: this.state.candidateList.filter((rec) => {
                            return (rec.candidateId != id);
                        })
                    });
            });
        }
    }


    // Handle Edit request 
    private handleEdit(id: number) {
        this.props.history.push("/candidate/edit/" + id);
    }

    // Returns the HTML table to the render() method.
    public renderCandidateTable(candidateList: CandidateData[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th>Candidate ID</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Position</th>
                    <th>Notation</th>
                </tr>
            </thead>
            <tbody>
                {candidateList.map(candidate =>
                    <tr key={candidate.candidateId}>
                        <td></td>
                        <td>{candidate.candidateId}</td>
                        <td>{candidate.name}</td>
                        <td>{candidate.gender}</td>
                        <td>{candidate.position}</td>
                        <td>{candidate.notation}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleEdit(candidate.candidateId)}>Edit</a>  |
                            <a className="action" onClick={(id) => this.handleDelete(candidate.candidateId)}>Delete</a>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}




export class CandidateData {
    candidateId: number = 0;
    name: string = "";
    gender: string = "";
    position: string = "";
    notation: string = "";
} 
