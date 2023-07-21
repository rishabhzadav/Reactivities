using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private DataContext _context;
            private IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                //throw new NotImplementedException();
                var activity = await _context.Activities.FindAsync(request.Activity.Id);
                // activity.Title = request.Activity.Title ?? activity.Title;
                // here mapper map the activity passed to the activity present 
                _mapper.Map(request.Activity, activity);

                await _context.SaveChangesAsync();
                return Unit.Value;

            }
        }
    }
}