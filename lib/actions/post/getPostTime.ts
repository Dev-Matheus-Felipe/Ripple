export function GetPostTime({createdAt} : {createdAt: Date}){
    const now = new Date();
    const past = new Date(createdAt);

    now.setHours(0, 0, 0, 0);
    past.setHours(0, 0, 0, 0);

    const days = Math.floor((now.getTime() - past.getTime()) / (1000 * 60 * 60 * 24));

    if(days === 0) return "Today"
    else if(days === 1) return "Yesterday"
    else if(days < 7) return `${days} days ago`

    const weeks = Math.floor(days / 7);
    if(weeks === 1) return "Last week"
    else if( weeks < 4) return `${weeks} weeks ago`

    const months = Math.floor(weeks / 4);
    if(months === 1) return "Last Month"
    else if(months < 12) return `${months} months ago`

    const years = Math.floor(months / 12)
    if(years === 1) return "Last year"
    else return `${years} years ago`
}