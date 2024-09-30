/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { FundCard } from './FundCard';
import { GlobalContext } from '../../context/GlobalContext';

export function PublicFundList({ funds }) {
    const { likedfunds } = useContext(GlobalContext);

    return (
        <div className="container px-4 py-5">
            <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
                {funds.map((fund, index) =>
                    <FundCard
                        key={index}
                        isLiked={likedfunds.includes(fund.id)}
                        {...fund} />)}
            </div>
        </div>
    );
}