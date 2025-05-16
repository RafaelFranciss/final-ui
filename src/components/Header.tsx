import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="header-left">
        <img
          src="https://scontent.fcrk1-3.fna.fbcdn.net/v/t39.30808-6/470183038_1826420584829574_7956691339001615982_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=VQGxtKDifcgQ7kNvwFN3eyF&_nc_oc=AdmqGnXpv8-NNd87MqOsT--gNQvf1Ki6myF7a5wo4IA4Wymu0inZ2pvYfWeAXtvkEp4&_nc_zt=23&_nc_ht=scontent.fcrk1-3.fna&_nc_gid=pcpb4-sVHcqifE3vL03n_Q&oh=00_AfLaVHv7LBscn5GCi-7fV642lLwSDetWeglmYjkIY_Oe_A&oe=682C8DD4"
          alt="Profile"
          className="profile-pic"
        />
        <span className="profile-name">Rafael Francis T. Acuña</span>
      </div>
      <h1 className="header-title">Social Media App</h1>
      <div className="header-right"></div>
    </header>
  );
};

export default Header;