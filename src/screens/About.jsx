import joyce from "../assets/about-joyce.jpg"
import floral from "../assets/about-floral.png"

export default function About() {
  return (
    <div className="about-screen">
      <main className="about-floater">
        <section className="about-me">
          <img src={joyce} alt="joyce" />
          <p>Joyce is the Founder and CEO of <span className="corp">JAMix By Design</span>.  Her love and passion for event planning and decorating developed out of her own process in curating family events. She is very detail oriented and will spend every second to make sure your day is stress free.</p>
        </section>
        <section className="about-jamix">
          <h1>About JAMix</h1>
          <img src={floral} alt="floral arrangement" />
          <div className="about-jamix-ps">
            <p><span className="corp">JAMix By Design</span> is an event planning, designing and decorating team dedicated to bringing your vision and desires to life. Like the founder, the team works tirelessly to make each day as special as it can be. We take on each event like our very own. Beginning with the first planning meeting, we make your vision our mission.  We strive to capture it all and not miss a beat!</p>
            <p>The Mix in JAMix represents the array of clients, services, designs, cultures, and atmosphere we aim to bring and serve. Are you thinking of something unique and not cookie cutter? Give us a call today!</p>
          </div>
        </section>
      </main>
      <div className="about-gold-bg"></div>

    </div>
  )
}
