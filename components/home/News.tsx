import { Arrow, Button, Pair, linkProps } from "@/components/ui";
import { news } from "@/lib/content";

/* "Explore our latest News & Events": the live block's three upcoming events and two latest news posts. */
export default function News() {
  return <section className="news" id="news">
    <div className="wrap">
      <div className="news-head">
        <h2 className="h2" data-reveal="heading"><Pair parts={news.title} /></h2>
        <Button href={news.more.href} tone="line">{news.more.label}</Button>
      </div>
      <div className="news-grid">
        <div className="events" data-reveal="card">
          <p className="label events-label"><span className="events-dot" aria-hidden="true" />{news.eventsLabel}</p>
          <ul>{news.events.map((e) => <li key={e.name} className="event">
            <p className="event-date">{e.date}</p>
            <h3 className="event-name">{e.name}</h3>
            <p className="event-meta"><span>{e.booth}</span><span>{e.place}</span></p>
          </li>)}</ul>
        </div>
        {news.posts.map((p) => <article key={p.href} className="post" data-reveal="card">
          <a href={p.href} {...linkProps(p.href)}>
            <figure className="post-pic">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt="" loading="lazy" />
            </figure>
            <p className="post-meta label"><span>{p.date}</span><span>{p.tag}</span></p>
            <h3 className="post-title">{p.title}</h3>
            <p className="post-excerpt">{p.excerpt}</p>
            <span className="post-more"><span>{news.readMore}</span><Arrow size={14} /></span>
          </a>
        </article>)}
      </div>
    </div>
  </section>;
}
