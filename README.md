## PadFinder (Frontend)

This is the frontend code for PadFinder, a residential real estate rental website.  Any visitor can search by street, state, or zip and look at properties available for lease / contact the listing agent.  Registered users can save properties to their favorites.  Registered listing agents can also list properties for lease and manage their listings.  

### `Home Page`

For new visitors, calls the WHOISXML API to get ip geolocation and fetches nearby properties from the backend.
For visitors who have already done a search, skips the IPGEO stuff and just fetches properties nearby the previous search location. 

On search (SearchInput component), pushes history to the Map View page w/ param = search input.

### `Map View`

Search results page. Pulls search location via useParams, sends that to backend which returns coordinates, display address, and nearby properties --> those go into MapContext.  Map component consumes MapContext as does Home page.  Map updates coordinates and refetches nearby properties on drag event.

### `NewListing / UpdateListing`

Registered listing agents can create listings - all fields are required.  Minimum of 3 photos are required (300kb max per pic) bc listings without photos are straight trash.

Lister can update listings: 1) update fields (address cannot be changed), 2) mark photos for deletion, 3) add photos

### 'Made w/ CRA'

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).