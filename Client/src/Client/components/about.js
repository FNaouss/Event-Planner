import React, { Fragment } from "react";
import { Link } from "react-router-dom";
function About() {
  return (
    <Fragment>
      <div className="text-slate-50 mt-20 bg-gray-500 py-12">
        <h1 className="text-4xl px-10 font-mono">How Event Planner works</h1>
        <p className="font-serif tracking-wide indent-6">
          It is simple and powerful. Just log in with your account and then
          create or join events
        </p>
      </div>
      <br />
      <div className="flex flex-row">
        <div className="bg-slate-50 static p-3">
          <div className=" text-7xl opacity-100">1</div>
          <h2 className="text-2xl">Log in with your account</h2>
          <p>
            To get started, create an account and choose whether it's a
            visitor's account or an organizer's. Then enter your account info to
            log into the website.
          </p>
        </div>
      </div>
      <div class="flex flex-row">
        <div className="bg-slate-50 static">
          <div className=" text-7xl opacity-100">2</div>
          <h2 className="text-2xl">Create events</h2>
          <p>
            After creating your account, if you are an event organizer and want
            to list your event to the public visitors, Event Planner is the
            right app to plan your event and show it to others.
          </p>
        </div>
      </div>
      <div class="flex flex-row">
        <div className="bg-slate-50 static">
          <div className=" text-7xl opacity-100">3</div>
          <h2 className="text-2xl">Join events</h2>
          <p>
            If you just want to attend an event you're interested in, or want to
            explore events already planned on the app, Event Planner fulfills
            your needs with a feature we'll talk about below.
          </p>
        </div>
      </div>
      <div class="flex flex-row text-center">
        <div className="bg-slate-50 static">
          <div className=" text-7xl opacity-100 text-center">4</div>
          <h2 className="text-2xl">Like an event</h2>
          <p>
            Do you want the app to show you your favourite events ? You have the
            right to like events and add them to the list of favourite ones.
          </p>
        </div>
      </div>
    </Fragment>
  );
}

export default About;
