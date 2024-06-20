import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const LandingPageContent = () => {
  return (
    <div className="m-tb-30">
      <div id="about" className="flex-row space-between align-center flex-containers">
        <div className="content content-cover">
          <h1 className="mb-30 title text-align-center">About us</h1>
          <p>
            Spearfish is an app that helps you save and invest in local people and businesses. 
            You can earn points and rewards by completing tasks and challenges set out 
            for you in the app. You also get to compare your progress to friends and other 
            players, so it’s competitive too!
          </p>

          <p className="fw-600 m-tb-20">
            Group savings with a clear focus can motivate more individuals to save. In 
            turn, they pool their funds and get the things they desire while working 
            towards a better future.
          </p>

          <p>
            Spearfish is engaging and designed to be fun and educational. Learning to 
            save is a habit we need to manage our expenses, putting aside 
            something for our use in the future, which is one of the reasons 
            why we reward you for savings actions linked to our platform.
            It's often easy for us to get into debt, we need a helping hand to get out of debt.
          </p>
        </div>
      </div>

      <div className="m-tb-30 flex-row space-between align-center flex-containers gap-20">
        <div className="content">
          <p className="title">#1 FEATURE</p>
          <h1 className="text-gradient mb-30">The Budget Planner.</h1>
          <p className="mb-20">Do you know where your money is or is going?</p>
          <p>
            With the budget planner, we help you manage your monthly budgets and plan for 
            long-term purchases. This includes hefty expenses, daily 
            living and many other things your income does for you.
            <br /><br />The budget planner helps you map your prime 
            categories of living, saving, expenditure and emergencies.
          </p>
        </div>
        <div className="image">
          <img src="/images/sections/sec-1.png" alt="about" />
        </div>
      </div>

      <div className="m-tb-30 flex-row space-between align-center flex-containers gap-20">
        <div className="image">
          <img src="/images/sections/sec-2.png" alt="about" />
        </div>
        <div className="content">
          <p className="title">#2 FEATURE</p>
          <h1 className="text-gradient mb-30">The Goals.</h1>
          <p>
            The habit of saving money reflects one's belief about the value of 
            money. These concepts can be redefined and angled to help you make 
            better decisions on your use of money. The temptation of owning 
            expensive and shiny new items can be strong, but it's crucial to ensure 
            that the cost does not harm our future or that of our children.
            <br /><br />We can train ourselves to manage our spending and plan 
            our purchases. We want to help people save more, spend smarter, 
            and worry less about money - and still get what they want.
            <br /><br />
            We do this through 'Goals', split into 3,6 and 9-month events 
            to save for a purpose, with a purpose. A Goal enables you to 
            save money for future purchases and travel.<br /><br />
            Our partnership with Money market financial institutions 
            and product and services businesses offers unique 
            and exciting individual and group targets.<br /><br />
            Each Goal charges 10% of the saved value. In return, 
            we use 40% of this to support community projects and 60% to keep running.
          </p>
        </div>
      </div>

      <div className="m-tb-30 flex-row space-between align-center flex-containers gap-20">
        <div className="content">
          <p className="title">#3 FEATURE</p>
          <h1 className="text-gradient mb-30">Support Local Business, Align with Community Beliefs</h1>
          <p>
            Most of us join chamas to raise monthly money and wait to get paid when 
            our turn comes around. Due to trust issues, the number of successful 
            groups can only be so small. But what if we could create more extensive, 
            trustworthy groups to invest large amounts for equally high returns?<br /><br />
            We can improve our communities by investing in local startups that share our 
            values and do the kind of business that builds others around us and create 
            better neighbourhoods.<br /><br />By providing investment caps, we can get 
            communities to help establish the local businesses they want to see around them.
          </p>
        </div>
        <div className="image">
          <img src="/images/sections/sec-3.png" alt="about" />
        </div>
      </div>

      <div className='flex-column-center align-center m-tb-20 quote'>
        <p style={{ fontSize: '2rem', marginBottom: '50px' }} className='text-align-center'>
          It's easy to get into Debt on your own,
          <span className="fw-bold"> to get out of Debt, you need a helping hand</span>
        </p>
        <Link to='/signup' className='link-no-decoration'>
          <button className='button-outlined button-fit-content fs-1-2'>
            Get started <Icon className='ml-10' icon='material-symbols:arrow-right-alt-rounded' />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPageContent;
