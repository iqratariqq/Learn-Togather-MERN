import { LANGUAGE_TO_FLAG } from "../constants";
import { Link } from "react-router-dom";

const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-200 hover:shadow-lg transition-shadow mb-7 mr-5">
      {console.log("rend", friend)}
      <div className="card-body  p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="size-5 avatar">
            <img src={friend.profilePic} alt={friend.fullName} />
          </div>
          <h3 className="font-semibold truncate">{friend.fullName}</h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span className="badge badge-secondary">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </span>
          <span className="badge badge-secondary">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </span>
        </div>
        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
          Message
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;

export function getLanguageFlag(lang) {
  if (!lang) {
    return null;
  }
  const lowerLang = lang.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[lowerLang];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${lang} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
}
