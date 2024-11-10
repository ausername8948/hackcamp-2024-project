import React from 'react';
import './CardSidebar.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MessageIcon from '@mui/icons-material/Message';
import BookmarkIcon from '@mui/icons-material/Bookmark';

function CardSidebar() {
    return (
        <div className="cardSidebar">
            <div className="cardSidebar_button">
                <FavoriteIcon />
                <p>Like</p>
            </div>
            <div className="cardSidebar_button">
                <MessageIcon />
                <p>Comment</p>
            </div>
            <div className="cardSidebar_button">
                <BookmarkIcon />
                <p>Save</p>
            </div>
        </div>
    )
}

export default CardSidebar;