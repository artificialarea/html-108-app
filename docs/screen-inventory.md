# Screen Inventory

### URL Routes:
* **`/`** landing page (root)
    * if user not signed in, introdutory page
    * if user signed in... may be rerouted to `/user/:user_id` **homepage**
* **drum machine page(s)**
    * **`/???`** ... **`/track/edit?`** for new track (unsaved)
    * **`/track/:track_id`** saved track, machine prepopulated with track data from db
* **`/login`**
* **`/registration`**
* **`/???`** public dashboard
   * list of public tracks done by users
* **`/user/:user_id`** private user dashboard/homepage
    * user dashboard of saved private tracks (some of which may be public)


### Modals:
* **persistent navigation** 
    * login/register > private dashboard
    * public community dashboard
    * drum machine (new track)
    * about/info
* **keyboard guide** on drum machine page
* **login overlay** on drum machine page, if user clicks 'save' button when not logged in.
* **save/update button** on drum machine page
* **edit title** on private dashboard page (for each track module)
* **delete track button** on private dashboard page (for each track module)
