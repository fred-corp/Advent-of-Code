import fileinput, collections

g = { ( x, y )
    for y, r in enumerate( fileinput.input() )
    for x, c in enumerate( r.strip( '\n' ) )
    if c == '#' }

d = [ ( 0, -1 ), ( 0, 1 ), ( -1, 0 ), ( 1, 0 ) ]
n = [ ( -1, -1 ), ( 0, -1 ), ( 1, -1 ), ( 1, 0 ),
    ( 1, 1 ), ( 0, 1 ), ( -1, 1 ), ( -1, 0 ) ]

r = 0
while True:
  p = {}
  for ex, ey in g:
    p[ ( ex, ey ) ] = ( ex, ey )
    if any( ( ex + nx, ey + ny ) in g for nx, ny in n ):
      for c in range( 4 ):
        dx, dy = d[ ( r + c ) % 4 ]
        if ( ( ex + dx,      ey + dy      ) not in g and
          ( ex + dx - dy, ey + dy + dx ) not in g and
          ( ex + dx + dy, ey + dy - dx ) not in g ):
          p[ ( ex, ey ) ] = ( ex + dx, ey + dy )
          break
  c = collections.Counter( p.values() )
  ng = { p[ ( ex, ey ) ] if c[ p[ ( ex, ey ) ] ] == 1 else ( ex, ey )
        for ex, ey in g }
  r += 1
  if ng == g:
    print( r )
    break
  g = ng
  if r == 10:
    x0, y0 = min( x for x, y in g ), min( y for x, y in g )
    x1, y1 = max( x for x, y in g ), max( y for x, y in g )
    print( sum( ( x, y ) not in g
          for y in range( y0, y1 + 1 )
          for x in range( x0, x1 + 1 ) ) )