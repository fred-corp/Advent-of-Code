# Small decorator to print the runtime of a function
#
# Borrowed from https://sanjass.github.io/notes/2019/07/28/timeit_decorator 

from functools import wraps
import time

def timeit(my_func):
  @wraps(my_func)
  def timed(*args, **kw):
  
    tStart = time.time()
    output = my_func(*args, **kw)
    tEnd = time.time()
    
    print('"{}" took {:.3f} ms to execute\n'.format(my_func.__name__, (tEnd - tStart) * 1000))
    return output
  return timed