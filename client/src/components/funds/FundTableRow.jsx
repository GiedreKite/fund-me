/* eslint-disable react/prop-types */
export function FundTableRow({ index, name, img, sumtotal,sum, about, linkVisibility }) {
    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td>
                <img src={img} alt={name} style={{ maxHeight: '4rem', maxWidth: '6rem' }} />
            </td>
            <td>{name}</td>
            {linkVisibility ? <td>{img}</td> : null}
            <td>{sumtotal}</td>
            <td>{sum}</td>
            <td>{about}</td>
          
            <td>
                <button className="btn btn-small btn-danger" type="button">Delete</button>
            </td>
        </tr>
    );
}