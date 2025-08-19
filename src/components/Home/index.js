import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {
    iplTeamsList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getIplTeamsList()
  }

  getIplTeamsList = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const fetchedData = data.teams.map(each => ({
      name: each.name,
      id: each.id,
      teamImageUrl: each.team_image_url,
    }))

    this.setState({iplTeamsList: fetchedData, isLoading: false})
  }

  render() {
    const {iplTeamsList, isLoading} = this.state
    return (
      <div className="app-container">
        <div className="heading-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
          />
          <h1>Ipl Dashboard</h1>
        </div>

        <div className="list-container">
          {isLoading ? (
            <div data-testid="loader">
              <Loader type="TailSpin" color="#0000ff" width={50} height={50} />
            </div>
          ) : (
            <ul className="list-container">
              {iplTeamsList.map(each => (
                <TeamCard key={each.id} cardDetails={each} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Home
