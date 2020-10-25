import db from './database'

//get all matches
export async function getAll(){
    const result = await db.pool.query('SELECT * FROM public.match')
    return result
}

//get one match by id
export async function getOne(id){
    const result = await db.pool.query('SELECT * FROM public.match WHERE id_match = $1', [id])    
    return result
}

//create match
export async function insertOne(home_team, away_team, home_score, away_score, sport, league){
    db.pool.query(`INSERT INTO public.match(home_team_id, away_team_id, home_score, away_score, league_id, sport_id)
                  VALUES($1, $2, $3, $4, $5, $6)`, [home_team, away_team, home_score, away_score, league, sport])
}

//get matches by sport
export async function getMatchesBySport(id){
    const result = await db.pool.query('SELECT * FROM public.match WHERE sport_id = $1', [id])
    
    if((await result).rowCount == 0){
        throw `Cannot find match with sport with 'id' = '${id}'`
    }
    
    return result
}

//get matches by league
export async function getMatchesByLeague(id){
    const result = await db.pool.query('SELECT * FROM public.match WHERE league_id = $1', [id])
    
    if((await result).rowCount == 0){
        throw `Cannot find match with league with 'id' = '${id}'`
    }
    
    return result
}

export async function overwrite(id, home_team, away_team, home_score, away_score, sport, league){
    db.pool.query(`UPDATE public.match SET home_team_id = $2, away_team_id = $3, home_score = $4, away_score = $5,
                  sport_id = $6, league_id = $7 WHERE id_match = $1`, [id, home_team, away_team, home_score, away_score, sport, league])
}

export async function deleteRow(id){
    db.pool.query('DELETE FROM public.match WHERE id_match = $1', [id])
}
