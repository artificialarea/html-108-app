# Screen Inventory

### URL Routes:
* **landing page**
    * if user not signed in, introdutory page
    * if user signed in... rerouted to `:user_id` **homepage**
* **drum machine page(s)**
    * new track (unsaved)
    * `:track_id` — machine prepopulated with track data from db
        * _perhaps this might also be considered the `/edit` view?_
* **login page**
* **registration page**
* **community: public dashboard** 
    * list of public tracks done by users
* **homepage: private dashboard**
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
