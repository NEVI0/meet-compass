<div id="top"></div>

<br />

<div align="center">
  <a href="https://user-images.githubusercontent.com/45011343/174501665-8be30f33-7850-4c97-90ac-633debe2dedc.png">
    <img src="public/assets/images/meet-compass-logo-purple.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">
	Meet Compass
  </h3>

  <p align="center">
    An awesome meet app built with Next.js
    <br />
    <a href="https://meet-compass.herokuapp.com/"><strong>Visit the site »</strong></a>
  </p>
</div>

## :video_camera: About The Project

There are many great README templates available on GitHub; however, I didn't find one that really suited my needs so I created this enhanced one. I want to create a README template so amazing that it'll be the last one you ever need -- I think this is it.

Here's why:
* Your time should be focused on creating something amazing. A project that solves a problem and helps others
* You shouldn't be doing the same tasks over and over like creating a README from scratch
* You should implement DRY principles to the rest of your life :smile:

Of course, no one template will serve all projects since your needs may be different. So I'll be adding more in the near future. You may also suggest changes by forking this repo and creating a pull request or opening an issue. Thanks to all the people have contributed to expanding this template!

## :electric_plug: How it works

You need just to open the site to be able to create a meet or connect to other user meet. This happens because when the sites starts it is opened a web socket connection.

In the home page, you have two choises, **create a meet** or **joing an existing meet**. By creating a new meet you are going to be redirect to the meet page and there you can copy your meet link and share with someone.

Now, to join an existing meet you need to click in **join meet** link right after the **create new meet** button in the home page. When clicked, it is going to open a modal in the middle of the screen. You just need to put your name, e-mail and meet ID that you received and then click **Join meet**.

This are going to happen automatically when the user open a shared meet link.

This projects uses **WebRTC** and the **[simple-peer](https://github.com/feross/simple-peer)** package to create a connection between the users to share the videos and audio. 

Web socket is a plus in this project. It helps to handle the peer connections and a lot of events like send a message to other user.

## :hammer_and_wrench: How to run

- First, clone the repository
```
  ~ git clone https://github.com/NEVI0/meet-compass.git
```

- Then open the project and install the dependencies
```
  ~ yarn
```

- Now, you just need to run
```
  ~ yarn dev
```

## :unlock: Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## :iphone: Contact

- **[LinkedIn](https://www.linkedin.com/in/n%C3%A9vio-magagnin-045710177/)**
- **[Instagram](https://www.instagram.com/nevio_costa/)**
- **neviocostamagagnin@gmail.com**

<p align="right">
  <a href="#top">:arrow_up:</a>
</p>
