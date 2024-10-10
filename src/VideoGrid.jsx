
import './index.css'; // External CSS for styling

const VideoGrid = () => {
  const playlists = [
    {
      title: 'التعليق على صحيح البخاري',
      url: 'https://www.youtube.com/watch?v=NqmQNzo3mOQ&list=PLjfukAN1bSfElA2FoLrbKRdPZTez4xeRf&pp=iAQB',
    },
    {
      title: 'تفسير سورة البقرة',
      url: 'https://www.youtube.com/watch?v=vQJaPu2n1Kk&list=PLjfukAN1bSfH4ZtpXN005nLSPXBEBrWdW&pp=iAQB',
    },
    {
      title: 'حق المسلم على المسلم',
      url: 'https://www.youtube.com/watch?v=f0s7A1Jv5LI&list=PLjfukAN1bSfHEDKRmzu4-SnDcsOjWeg86&pp=iAQB',
    },
    {
      title: 'تعلم الصلاة في لحظات',
      url: 'https://www.youtube.com/playlist?list=PLjfukAN1bSfFTdDzfqcA4k22Pgwt_D41s',
    },
    {
        title: 'السيرة النبوية',
        url: ' https://www.youtube.com/watch?v=H_n7ZjSLrVg&list=PLjfukAN1bSfH0s0g-NoRJcG5bwxe3tXbf&pp=iAQB',
    },
    {
        title: 'آداب الدعاء وأحكامه',
        url: ' https://www.youtube.com/playlist?list=PLjfukAN1bSfExgVumfJmoO1t4yYWhyOF-',
    },
    {
        title: 'سجود السهو',
        url: ' https://www.youtube.com/playlist?list=PLjfukAN1bSfF0WnVbJXjknlkbJueXnPh6',
    },
    {
        title: 'شرح الأربعين النووية',
        url: ' https://www.youtube.com/playlist?list=PLjfukAN1bSfFd-YOyOlAEuZWMDkNHMaWE',
    },
    {
        title: 'أمراض القلوب وشفاؤها ',
        url: 'https://www.youtube.com/playlist?list=PLjfukAN1bSfHbOyAp7e_b3fETFNAXACap',
    },
    {
        title: 'سلسلة الجنة والنار ',
        url: ' https://www.youtube.com/playlist?list=PLjfukAN1bSfHx_zsSc8F-pTP-jA3OMVdr',
    },
    {
        title:'تفسير سورة الأعلى',
        url: ' https://www.youtube.com/playlist?list=PLjfukAN1bSfEVlN-hKCOvlnJZ19f8qMTc',
    },
    {
        title: 'تراجم العلماء',
        url: ' https://www.youtube.com/playlist?list=PLjfukAN1bSfF0itzMRqSWiwlbrAC85vP_',
    },

  ];

  return (
    <div className="video-grid-container">
      <h1>فيديوهات أبو أوس الجزائري </h1>
      <div className="video-grid">
        {playlists.map((playlist, index) => (
          <a key={index} href={playlist.url} target="_blank" rel="noopener noreferrer">
            <div className="video-card">
              <div className="card-content">
                <h2>{playlist.title}</h2>
              </div>
              <div className="hover-content">
                <p>مشاهدة</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
