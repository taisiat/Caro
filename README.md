# caro

_Rails React fullstack clone of Turo_

### Background

Caro is a fullstack clone of <a href="https://turo.com/">Turo</a>, which is a peer-to-peer car rental service ('Airbnb for cars').

Caro features Google's autosuggest `Places Search Box` and `Google Maps`, with dynamic functionality to show the cars index based on the `Google Map` viewport and other search parameters.

With Caro, users have CRUD functionalities for:

- booking (fake) cars (full CRUD)
- writing car reviews (full CRUD)
- favoriting cars (create/read/delete)

Caro also has full user auth.

Explore it here! <a href="https://caro.herokuapp.com/">https://caro.herokuapp.com/</a>

See my <a href="https://github.com/taisiat">github</a> and <a href="https://www.linkedin.com/in/taisiakaraseva/">Linkedin</a>

---

### Functionality & MVPs

In Caro, users are able to:

- Search for cars with filters for dates available, car owner's 'Superhost' status, car experience type (ex: electric), daily rate, and location
- See a `Google Map` with plotted car search results, and narrow down search results by:
  - changing the `Google Map`'s viewport
  - searching locations in a Google autosuggest `Places Search Box`
- Book cars, with validations that include prevention of overlap in each car's booked-out dates
- View their trips, with ability to edit/delete future trips and add/edit/delete reviews of past trips; reviews flow through to update star ratings for cars and car hosts
- View a grid of their liked cars, and favorite/unfavorite cars from several app locations
- View reviews others left for their cars and reviews they wrote for their past trips
- Sign up/log in to an account or explore as demo user Dom Torreto

---

### Technologies, Libraries, APIs

This project is implemented with the following technologies:

- `React` and `JavaScript` frontend with `CSS` styling and `Redux state`
- `Ruby on Rails` backend with `JBuilder` to sculpt backend responses
- Google `Maps JavaScript API`, `Places API`, and `Geocoding API` to enable the map and locations search
- `AWS` for hosting car and user images and `Active Storage` for using images in app
- `Flatpickr` for trip date selection
- `Heroku` for app hosting
- `Webpack` to bundle and transpile the source code
- `npm` to manage project dependencies

---

### Implementation Highlights

### Car search

A user can dynamically search cars and narrow down results using filters and `Google Map` viewport area.

Example search starting with the Google autosuggest `Places Search Box`:

![Search via places searchbox](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWM0MWI5YzUwYWVhMTNkMzBjMjc3OTFkMGUyMjA1ZWZiMmVhMzY0NCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/XBFvDu4kJs7EZEEK3L/giphy.gif)

Example search starting with the city/experience tiles:

![Search via city and experience selectors](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDNhZjc1ZmI5NWUwNDc0M2FkZTRjYWE4MjZhMWEzODI4M2U0Y2MxNCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/xZMqP1G9zBF5M6kn7s/giphy.gif)

The `CarsSearchIndex` listens to changes in filters and triggers a backend call to fetch cars based on those filters. Before dispatching the fetch request, it also normalizes dates to UTC.

<h5 a><strong><code>CarsSearchIndex/index.js</code></strong></h5>

```JavaScript
useEffect(() => {
    if (
      minPricing && maxPricing && bounds && experienceType &&
      superhostFilter && searchPageFromDate && searchPageUntilDate
    ) {
      dispatch(
        fetchCars({
          minPricing, maxPricing, bounds, superhostFilter, experienceType,
          tripStart: handleDateChange(searchPageFromDate),
          tripEnd: handleDateChange(searchPageUntilDate),
        })
      );
    }
  }, [
    minPricing, maxPricing, bounds, superhostFilter, experienceType, searchPageFromDate,
    searchPageUntilDate, dispatch,
  ]);
```

Notably, dragging or zooming the Google Map triggers dispatching a cars fetch request by changing the value of `bounds`, which is a set of lat/lng values representing the `Google Map`'s viewport. If a user opts to search via the `Places Search Box`, the search action feeds a location and `viewport` coordinates to the map, which also results in a change to `bounds`. `Viewport` coordinates result in dynamic zoom - specific addresses ('Ferry Building') will zoom in closer than less specific ones ('San Francisco').

<h5 a><strong><code>CarsSearchIndex/index.js</code></strong></h5>

```JavaScript
const mapEventHandlers = useMemo(
    () => ({
      click: (event) => {
        const search = new URLSearchParams(event.latLng.toJSON()).toString();
      },
      idle: (map) => {
        const newBounds = map.getBounds().toUrlValue();
        if (newBounds !== bounds) {
          dispatch(
            fetchCars({
              minPricing, maxPricing,
              bounds: newBounds,
              superhostFilter, experienceType,
              tripStart: handleDateChange(searchPageFromDate),
              tripEnd: handleDateChange(searchPageUntilDate),
            })
          );
          setBounds(newBounds);
        }
      },
    }),
    [history]
  );
```

The backend then filters down the list of cars that meet criteria. An interesting filter to note is the last one that picks only cars that aren't booked out during the requested trip dates (if dates were provided). It checks the trips associated with each car and only selects the car if the possible overlap scenarios aren't happening between any of the car's trips and the requested trip dates.

<h5 a><strong><code>cars_controller.rb</code></strong></h5>

```Ruby
def index
    @cars = Car.includes(:host).includes(:reviews).includes(:trips)
    @cars = @cars.in_bounds(bounds) if bounds
    @cars = @cars.where(daily_rate: price_range) if price_range

    if superhost_filter === 'true'
      @cars = @cars.where(host_id: User.where(is_superhost: true).pluck(:id))
    else
      @cars
    end

    if experience_filter === 'all'
      @cars
    else
      @cars = @cars.where(category: experience_filter)
    end

    if !date_range
      @cars
    elsif date_range === ["",""] || date_range === ["Invalid Date", "Invalid Date"]
      @cars
    else
      @cars = @cars.where.not(id: Trip.where("(start_date <= ? AND end_date >= ?) OR (start_date <= ? AND end_date >= ?) OR (start_date >= ? AND end_date <= ?)", Date.parse(date_range[0]),Date.parse(date_range[0]) , Date.parse(date_range[1]), Date.parse(date_range[1]), Date.parse(date_range[0]), Date.parse(date_range[1]))
      .select(:car_id))
    end
end
```

The resultant cars list gets passed to the `Google Map` for placement of markers, and to the `CarList` component which maps each to a `CarSearchIndexItem`.

---

### An interesting search challenge

Caro allows users to start a `Places Search Box` + dates search from any page via a navbar searchline or the splash page's searchbar. The search action triggers a jump over to the cars search index, which dispatches a cars fetch using the search inputs.

The challenge came with how to force a cars fetch when initiating a `Places Search Box` + dates search when ALREADY on the cars search index page. Unlike other cases, here the page and map are already rendered.

#### My v0 solution
My v0 solution was to utilize a custom `handleSearchClick` on the `SearchLine` search component that checks current URL location and pushs search parameters to the URL if it detects it is already on the search page.

<h5 a><strong><code>SearchLine/index.js</code></strong></h5>

```JavaScript
const handleSearchClick = () => {
    if (location.pathname.match(/^\/cars\/?$|^(?!\/cars\/\d)\/cars\/\?.*/)) {
      setSearchPageFromDate(from);
      setSearchPageUntilDate(until);
      setSearchPageWhere(where);
      history.push(`/cars?coords=${coords.lat},${coords.lng}`);
    } else {
      localStorage.setItem("fromDate", from);
      localStorage.setItem("untilDate", until);
      localStorage.setItem("where", where);
      localStorage.setItem("coords", JSON.stringify(coords));
      history.push("/cars/");
    }
};
```

Meanwhile the `CarMap` listens to changes in the URL, parses the value if it finds the appropriate key, and changes the `Google Map`'s center and zoom level.

<h5 a><strong><code>CarMap/index.js</code></strong></h5>

```JavaScript
  const location = useLocation();

  useEffect(() => {
    if (map) {
      const urlParams = new URLSearchParams(location.search);
      if (urlParams.get("coords")) {
        const coords = urlParams
          .get("coords")
          .split(",")
          .map((coord) => parseFloat(coord));
        const newLatLng = new window.google.maps.LatLng(coords[0], coords[1]);
        map.setCenter(newLatLng);
        map.setZoom(14);
      }
    }
  }, [location]);
```

The change in the `Google Map`'s viewport triggers a change to `bounds` as described above, which causes a new dispatch to fetch cars, refreshing the search results.

#### My v1 solution

I refactored my frontend search code to use URL search params instead of `localStorage`. Storing the search query in the URL has benefits such as ability to share the search parameters easily with friends and press backspace to return to the same search query. 

This is what my code looks like now. This reflects a few refactors: `localStorage`-> URL search params, static zoom level -> viewport coordinates, and 'click to search' -> 'exit input box to search'.

<h5 a><strong><code>SearchLine/index.js, location input box example</code></strong></h5>

```JavaScript
const existingSearchParams = new URLSearchParams(location.search);


const handlePlaceOnSelect = (address) => {
    setWhere(address);
    geocodeByAddress(address)
      .then((results) => {
        if (results && results.length > 0) {
          getLatLng(results[0]).then((latLng) => {
            setCoords(latLng);
            existingSearchParams.set("coords", `${latLng.lat},${latLng.lng}`);
            existingSearchParams.delete("zoom");
            existingSearchParams.set("dates", dateRange);
            if (results[0].geometry.viewport) {
              existingSearchParams.set(
                "viewport",
                `${results[0].geometry.viewport.Ha.hi},${results[0].geometry.viewport.Ha.lo}, ${results[0].geometry.viewport.Ua.hi}, ${results[0].geometry.viewport.Ua.lo}`
              );
            }
            existingSearchParams.set("location", address);
            history.push({
              pathname: "/cars",
              search: existingSearchParams.toString(),
            });
          });
        } else {
          console.error("No results found for the address:", address);
        }
      })
      .catch((error) => console.error("Geocoding error:", error));
    setValidPlace(true);
  };
```

To accomodate the refactor, the `Google Map` now pulls the needed info from URL params and parses viewport coordinates to determine what area to show on the map.

<h5 a><strong><code>CarMap/index.js</code></strong></h5>

```JavaScript
  const urlParams = new URLSearchParams(location.search);
  const coordsParams = urlParams.get("coords");
  const zoomParams = urlParams.get("zoom");
  const viewportParams = urlParams.get("viewport");

  useEffect(() => {
    if (map) {
      if (coordsParams) {
        const coords = coordsParams
          .split(",")
          .map((coord) => parseFloat(coord));
        const newLatLng = new window.google.maps.LatLng(coords[0], coords[1]);
        map.setCenter(newLatLng);

        if (viewportParams) {
          const bounds = new window.google.maps.LatLngBounds();
          const coords = viewportParams
            .split(",")
            .map((coord) => parseFloat(coord.trim()));

          const west = coords[0];
          const east = coords[1];
          const north = coords[2];
          const south = coords[3];

          bounds.extend(new window.google.maps.LatLng(north, west));
          bounds.extend(new window.google.maps.LatLng(south, east));
          map.fitBounds(bounds);
        } else if (zoomParams) {
          map.setZoom(parseInt(zoomParams));
        } else {
          map.setZoom(15);
        }
      }
    }
  }, [coordsParams, zoomParams, viewportParams, map]);
```
---

### Backend-call optimization

Caro stores user, car, and other data across several tables and joins tables. Frontend pages have components that combine data from across several tables. Backend `model associations` and `JBuilder` help send the right info to each component while minimizing backend calls.

![Favorites and car show pages](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmNhZjAxZDNmMjMwOGVkOTExMWZkZGEzMTU2OGU0MjMzNjhiM2RiZiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/lv2XIQcOUJdqFMNcoT/giphy.gif)

As an example, the favorites page pulls all favorites for only the current user and eagerly loads associated data.

<h5 a><strong><code>favorites_controller.rb</code></strong></h5>

```Ruby
def index
    if current_user
        @favorites = Favorite.includes(:driver).includes(:car).where(driver_id: current_user.id).order(updated_at: :desc)
    else
        head :no_content
    end
end
```

`JBuilder` then constructs a response that includes info for each favorite and for the car that is attached to the favorite, along with the car's photos and host info.

<h5 a><strong><code>_favorite.json.jbuilder</code></strong></h5>

```Ruby
json.extract! favorite,
    :id,
    :driver_id,
    :car_id,
    :created_at

 json.car do
  json.extract! favorite.car, :id,
    :make,
    :model,
    :year,
    :mpg,
    :doors_count,
    :seats_count,
    :category,
    :automatic,
    :description,
    :guidelines,
    :daily_rate,
    :location,
    :active,
    :host_id,
    :created_at,
    :avg_cleanliness_rating,
    :avg_maintenance_rating,
    :avg_communication_rating,
    :avg_convenience_rating,
    :avg_accuracy_rating,
    :trips_count,
    :reviews_count,
    :city

  if favorite.car.photos.attached?
    photos = []
      favorite.car.photos.each do |photo|
    photos << url_for(photo)
  end
    json.photos_url photos
  end

  json.host do
      json.extract! favorite.car.host, :id, :first_name, :last_name, :approved_to_drive, :is_superhost, :is_clean_certified, :email, :phone_number, :created_at, :updated_at, :trips_count, :user_rating, :hosted_cars_count
  end
end

```

Because each favorite's info includes associated car and car's host detail, the `FavoriteIndexItem` component that renders each favorited car tile doesn't need to fetch its own data, but rather gets the required information via props as `favorite` from its parent `FavoritesPage`.

<h5 a><strong><code>FavoritesPage/index.js</code></strong></h5>

```JavaScript
...
<div id="favs-index-container">
    {favorites && favorites.map((favorite, idx) => (
        <FavoriteIndexItem key={idx} favorite={favorite} />
    ))}
</div>
...
```

As a result, `Redux state` looks like this:

![Redux state](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGU2ODM4YTBlNDU3ZjI3ODc0MGI0N2UyYzgwYjcyOWZjN2M3NDVhMiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/rGhoOU7i9Zo64YIafC/giphy.gif)

---

#### Other Features

Take a look at the source files for implementation of other notable features:

- User auth
- Sign up and log in modals
- Date handling between UTC backend and local timezone frontend
- Frontend and backend input validation + messaging throughout
- Loading page spinner

---

### Future Features

Upcoming improvements include:

- Additional CRUD for listing new cars
- Ability to change user profile picture

---

### Asset Attribution

- Seed content by <a href="https://chat.openai.com/chat">ChatGPT</a>
- Images:
  - Splash image by <a href="https://unsplash.com/@itookthose?">Sid Balachandran on Unsplash</a>
  - Other images from <a href="https://turo.com/">Turo</a>
